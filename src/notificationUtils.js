// Notification utilities for Mono-sashi PWA

// Request notification permission
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Check if notifications are supported and enabled
export function areNotificationsEnabled() {
  return ('Notification' in window) && Notification.permission === 'granted';
}

// Send a notification
export async function sendNotification(title, options = {}) {
  if (!areNotificationsEnabled()) {
    console.log('Notifications not enabled');
    return;
  }

  try {
    // If service worker is available, use it for better reliability
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        badge: '/icon.svg',
        icon: '/icon.svg',
        ...options
      });
    } else {
      // Fallback to regular notification
      new Notification(title, {
        icon: '/icon.svg',
        ...options
      });
    }
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

// Calculate next check time for an item
export function getNextCheckTime(item) {
  const unlockDate = new Date(item.unlockDate);
  const now = new Date();

  // If already unlocked, no need to check
  if (unlockDate < now) {
    return null;
  }

  // Check 24 hours before unlock
  const reminderTime = new Date(unlockDate.getTime() - 24 * 60 * 60 * 1000);

  if (reminderTime > now) {
    return reminderTime;
  }

  return unlockDate;
}

// Check and send notifications for items
export async function checkAndNotifyItems(items, settings, lang) {
  const now = new Date();
  const t = lang === 'en' ? 'en' : 'ja';

  const messages = {
    ja: {
      unlocked: (name) => `${name}の待機期間が終了しました`,
      unlockedBody: '冷静な判断ができます。本当に必要か再確認しましょう。',
      reminder: (name) => `明日、${name}の判断ができます`,
      reminderBody: '本当に必要か、今のうちに考えてみましょう。',
      budgetWarning: '予算の80%を使用しました',
      budgetWarningBody: (used, total) => `今月: ¥${used.toLocaleString()} / ¥${total.toLocaleString()}`,
      budgetExceeded: '月間予算を超過しました！',
      budgetExceededBody: (over) => `予算オーバー: ¥${over.toLocaleString()}`
    },
    en: {
      unlocked: (name) => `${name} cooling period ended`,
      unlockedBody: 'You can now make a calm decision. Is it really necessary?',
      reminder: (name) => `Tomorrow: ${name} decision time`,
      reminderBody: 'Take time to think if you really need it.',
      budgetWarning: 'Used 80% of monthly budget',
      budgetWarningBody: (used, total) => `This month: $${used.toLocaleString()} / $${total.toLocaleString()}`,
      budgetExceeded: 'Monthly budget exceeded!',
      budgetExceededBody: (over) => `Over budget: $${over.toLocaleString()}`
    }
  };

  const msg = messages[t];

  // Check for unlocked items
  const waitingItems = items.filter(i => i.status === 'waiting');

  for (const item of waitingItems) {
    const unlockDate = new Date(item.unlockDate);
    const timeDiff = unlockDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Notify when just unlocked (within last hour)
    if (hoursDiff < 0 && hoursDiff > -1) {
      await sendNotification(msg.unlocked(item.name), {
        body: msg.unlockedBody,
        tag: `unlock-${item.id}`,
        requireInteraction: true,
        actions: [
          { action: 'open', title: t === 'ja' ? '確認する' : 'Check' }
        ]
      });
    }

    // Notify 24 hours before
    if (hoursDiff > 23 && hoursDiff < 25) {
      await sendNotification(msg.reminder(item.name), {
        body: msg.reminderBody,
        tag: `reminder-${item.id}`,
        actions: [
          { action: 'open', title: t === 'ja' ? '確認する' : 'Check' }
        ]
      });
    }
  }

  // Check budget
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const thisMonthSpent = items
    .filter(i => i.status === 'bought' && i.boughtDate)
    .filter(i => {
      const d = new Date(i.boughtDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + curr.price, 0);

  const budgetUsagePercent = (thisMonthSpent / settings.monthlyBudget) * 100;

  // 80% warning (only once per day)
  const lastWarningDate = localStorage.getItem('lastBudgetWarning');
  const today = now.toDateString();

  if (budgetUsagePercent >= 80 && budgetUsagePercent < 100 && lastWarningDate !== today) {
    await sendNotification(msg.budgetWarning, {
      body: msg.budgetWarningBody(thisMonthSpent, settings.monthlyBudget),
      tag: 'budget-warning',
      requireInteraction: true
    });
    localStorage.setItem('lastBudgetWarning', today);
  }

  // Budget exceeded
  if (budgetUsagePercent >= 100 && lastWarningDate !== today) {
    const overAmount = thisMonthSpent - settings.monthlyBudget;
    await sendNotification(msg.budgetExceeded, {
      body: msg.budgetExceededBody(overAmount),
      tag: 'budget-exceeded',
      requireInteraction: true
    });
    localStorage.setItem('lastBudgetWarning', today);
  }
}

// Weekly summary notification
export async function sendWeeklySummary(items, settings, lang) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const t = lang === 'en' ? 'en' : 'ja';

  const messages = {
    ja: {
      title: '今週の節約サマリー',
      saved: (amount) => `¥${amount.toLocaleString()}の無駄遣いを回避しました！`,
      bought: (count, amount) => `${count}件購入: ¥${amount.toLocaleString()}`,
      rejected: (count, amount) => `${count}件見送り: ¥${amount.toLocaleString()}節約`,
      great: '素晴らしい自制心です！'
    },
    en: {
      title: 'Weekly Savings Summary',
      saved: (amount) => `Saved $${amount.toLocaleString()} this week!`,
      bought: (count, amount) => `${count} purchased: $${amount.toLocaleString()}`,
      rejected: (count, amount) => `${count} rejected: $${amount.toLocaleString()} saved`,
      great: 'Great self-control!'
    }
  };

  const msg = messages[t];

  const weekItems = items.filter(i => {
    const date = new Date(i.boughtDate || i.reviewDate);
    return date >= weekAgo && date <= now;
  });

  const bought = weekItems.filter(i => i.status === 'bought');
  const rejected = weekItems.filter(i => i.status === 'rejected');

  const boughtAmount = bought.reduce((acc, i) => acc + i.price, 0);
  const savedAmount = rejected.reduce((acc, i) => acc + i.price, 0);

  let body = '';
  if (rejected.length > 0) {
    body = msg.rejected(rejected.length, savedAmount);
    if (bought.length > 0) {
      body += '\n' + msg.bought(bought.length, boughtAmount);
    }
  } else if (bought.length > 0) {
    body = msg.bought(bought.length, boughtAmount);
  } else {
    body = msg.great;
  }

  await sendNotification(msg.title, {
    body: body,
    tag: 'weekly-summary',
    requireInteraction: false
  });
}

// Schedule periodic checks
export function scheduleNotificationChecks(items, settings, lang) {
  // Check every hour
  const checkInterval = 60 * 60 * 1000; // 1 hour

  // Clear existing interval
  const existingInterval = window.notificationInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }

  // Set up new interval
  const intervalId = setInterval(() => {
    checkAndNotifyItems(items, settings, lang);
  }, checkInterval);

  window.notificationInterval = intervalId;

  // Also check immediately
  checkAndNotifyItems(items, settings, lang);
}

// Check if it's time for weekly summary (Sunday 9 AM)
export function shouldSendWeeklySummary() {
  const now = new Date();
  const lastSummary = localStorage.getItem('lastWeeklySummary');

  // Check if it's Sunday
  if (now.getDay() !== 0) {
    return false;
  }

  // Check if it's around 9 AM (between 9-10)
  const hours = now.getHours();
  if (hours < 9 || hours >= 10) {
    return false;
  }

  // Check if we haven't sent one today
  const today = now.toDateString();
  return lastSummary !== today;
}

// Initialize notifications
export async function initializeNotifications(items, settings, lang, notificationSettings) {
  if (!notificationSettings.enabled) {
    return false;
  }

  const permitted = await requestNotificationPermission();
  if (!permitted) {
    return false;
  }

  // Schedule checks
  scheduleNotificationChecks(items, settings, lang);

  // Check for weekly summary
  if (notificationSettings.weeklySummary && shouldSendWeeklySummary()) {
    await sendWeeklySummary(items, settings, lang);
    localStorage.setItem('lastWeeklySummary', new Date().toDateString());
  }

  return true;
}
