ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address               => "smtp.gmail.com",
  :port                  => 587,
  :domain                => "mail.google.com",
  :user_name             => "sahmed@folio3.com",
  :password              => "",
  :enable_starttls_auto  => true
}