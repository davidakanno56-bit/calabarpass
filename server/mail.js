// server/mail.js
// CalabarPass Transactional Mail Service & Clearinghouse Email Dispatcher

// In-memory audit log of dispatched transactional emails
const dispatchedEmails = [];

/**
 * Send a transactional email to a merchant or tourist
 * @param {Object} options
 * @param {string} options.to_email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.body - Plaintext email body
 * @param {string} [options.html] - Optional HTML formatted body
 * @returns {Object} Dispatch receipt
 */
export function sendTransactionalEmail({ to_email, toEmail, subject, body, html }) {
  const recipient = (to_email || toEmail || "").trim();
  if (!recipient) {
    console.warn("⚠️ [MAIL SERVICE] Transactional email called with no recipient email.");
  }

  const emailRecord = {
    id: `mail-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
    to: recipient,
    to_email: recipient,
    subject: subject || "CalabarPass Official Notification",
    body: body || "",
    html: html || null,
    dispatchedAt: new Date().toISOString(),
    status: "DELIVERED"
  };

  dispatchedEmails.unshift(emailRecord);
  if (dispatchedEmails.length > 200) {
    dispatchedEmails.pop();
  }

  console.log(`\n======================================================`);
  console.log(`📧 [TRANSACTIONAL EMAIL DISPATCHED]`);
  console.log(`📬 To:      ${emailRecord.to}`);
  console.log(`📋 Subject: ${emailRecord.subject}`);
  console.log(`🕒 Time:    ${emailRecord.dispatchedAt}`);
  console.log(`📝 Body:\n${emailRecord.body}`);
  console.log(`======================================================\n`);

  return {
    success: true,
    messageId: emailRecord.id,
    to: recipient,
    subject: emailRecord.subject,
    timestamp: emailRecord.dispatchedAt
  };
}

// Alias for Python / FastAPI naming convention
export const send_transactional_email = sendTransactionalEmail;

export function getDispatchedEmails(recipient) {
  if (recipient) {
    return dispatchedEmails.filter(
      (m) => m.to.toLowerCase() === recipient.toLowerCase()
    );
  }
  return [...dispatchedEmails];
}

export function clearDispatchedEmails() {
  dispatchedEmails.length = 0;
  return { success: true };
}
