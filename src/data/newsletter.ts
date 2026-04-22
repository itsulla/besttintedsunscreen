/**
 * Newsletter form config. The form component does a plain HTML POST to
 * `actionUrl`, so any provider that accepts form-encoded signups works
 * (Beehiiv, Kit/ConvertKit, MailerLite, Buttondown, Formspree). Empty
 * actionUrl = form shows in preview mode with the submit button disabled.
 */

export const NEWSLETTER = {
  // Beehiiv native form endpoint for the publication
  //   https://besttintedsunscreen.beehiiv.com/ (publication ID d2c95b6b-...)
  // Form submissions redirect to Beehiiv's hosted thank-you page.
  actionUrl: "https://besttintedsunscreen.beehiiv.com/create",

  // Beehiiv's email field is named "email"
  emailFieldName: "email",

  // Hidden fields Beehiiv expects on every signup POST
  hiddenFields: {
    sent_from_orchid: "true",
    signup_flow_id: "",
    automation_ids: "",
    double_opt: "false",
  } as Record<string, string>,

  // Signup promise — something we can actually deliver every week.
  leadMagnet: "The Sunday sunscreen drop",
  leadMagnetSubtitle:
    "One email every Sunday. New product launches, restock alerts, quiet sales, and whatever's rising in Korean skincare right now.",

  // Thank-you message after successful submission.
  successMessage: "You're in. First drop lands this Sunday ☀️",

  // Subscriber count cue (optional — omit until you have real numbers).
  showSubscriberGoal: true,
  subscriberGoalLabel: "Skincare nerds who actually read their inbox",
};
