class UserMailer < ActionMailer::Base
  require 'icalendar'
  require 'date'

  default :from => "sahmed@folio3.com"
  def send_mail(user)
    set_mailer_settings!
    data = File.read(Rails.root.join('app/assets/images/folio3-mail.png'))
    attachments.inline['logo.png'] = { :data => data, :mime_type => "image/png",
      :encoding => "base64"}
    data_fb = File.read(Rails.root.join('app/assets/images/facebook.png'))
    attachments.inline['facebook.png'] = { :data => data_fb, :mime_type => "image/png",
      :encoding => "base64"}
    data_tw = File.read(Rails.root.join('app/assets/images/twitter.png'))
    attachments.inline['twitter.png'] = { :data => data_tw, :mime_type => "image/png",
      :encoding => "base64"}
    data_li = File.read(Rails.root.join('app/assets/images/linkedin.png'))
    attachments.inline['linkedin.png'] = { :data => data_li, :mime_type => "image/png",
      :encoding => "base64"}
    @user = user
    @subject = Email.find(:first, :conditions => [ "do_action = ?", @user.candidate_status.name]).try(:subject)
    content_type "text/html"
    mail(:to=> @user.email, :subject => "#{@subject}")
  end
  
  def send_interview_mail(interview, schedule = '')
    set_mailer_settings!
    data = File.read(Rails.root.join('app/assets/images/folio3-mail.png'))
    attachments.inline['logo.png'] = { :data => data, :mime_type => "image/png",
      :encoding => "base64"}
    data_fb = File.read(Rails.root.join('app/assets/images/facebook.png'))
    attachments.inline['facebook.png'] = { :data => data_fb, :mime_type => "image/png",
      :encoding => "base64"}
    data_tw = File.read(Rails.root.join('app/assets/images/twitter.png'))
    attachments.inline['twitter.png'] = { :data => data_tw, :mime_type => "image/png",
      :encoding => "base64"}
    data_li = File.read(Rails.root.join('app/assets/images/linkedin.png'))
    attachments.inline['linkedin.png'] = { :data => data_li, :mime_type => "image/png",
      :encoding => "base64"}
    @interview = interview
    @loc = Location.find(:first, :conditions => {:id =>  @interview.location_id}).try(:city)
    @user = Candidate.find(interview.candidate_id)
    @job = Job.find(@user.job_id)
    content_type "text/html"
    mail(:to=> @user.email, :subject => "Folio3 | #{@interview.interview_type} call for #{@job.title}")
    #    meeting_request_with_calendar.deliver
  end
  
  def make_ical(interview, schedule = '')
    set_mailer_settings!
    @interview = interview
    @candidate = Candidate.find(interview.candidate_id)
    @job = Job.find(@candidate.job_id)
    location = Location.find(@interview.location_id).try(:city)
    send_mail_to = "hiqbal@folio3.com, smahmood@folio3.com, sriaz@folio3.com"
    text = ''
    interviewers_ics = '\n'
    if location == 'Karachi Office A'
      send_mail_to += ', shoaibkhan@folio3.com, iahmed@folio3.com'
    end
    if location == 'Karachi Office B'
      send_mail_to += ', sakhan@folio3.com, masif@folio3.com'
    end
    if @interview.user_id?
      @user1 = User.find(@interview.user_id)
      job_extension = File.extname(@job.evaluation_file_name).downcase
      attachments['evaluationsheet' + job_extension] =  File.read("public/system/evaluations/#{@job.id}/original/#{@job.evaluation_file_name}")
      cv_extension = File.extname(@candidate.resume_file_name).downcase
      attachments['candidate_cv' + cv_extension] =  File.read("public/system/resumes/#{@candidate.id}/original/#{@candidate.resume_file_name}")
      send_mail_to += ', ' + @user1.try(:email)
      text += 'Interviewer:<br />' + @user1.try(:name)
      interviewers_ics += 'Interviewer:\n' + @user1.try(:name)
    end
    if @interview.user_id_1?
      @user2 = User.find(@interview.user_id_1)
      send_mail_to += ', ' + @user2.try(:email)
      text += '<br />' + @user2.try(:name)
      interviewers_ics += '\n' + @user2.try(:name)
    end
    subject = "#{schedule} #{@interview.interview_type} of #{@candidate.try(:name)} for #{@job.title}"
    @calendar = Icalendar::Calendar.new
    event = Icalendar::Event.new
    event.start = @interview.interview_date.strftime("%Y%m%dT%H%M%S%Z")
    event.end = (@interview.interview_date + 1.hour).strftime("%Y%m%dT%H%M%S%Z")
    event.summary = subject
    event.description = "#{schedule} #{@interview.interview_type} of #{@candidate.name} \n #{interviewers_ics}"
    event.organizer = "Folio3 Private Ltd."
    event.location = location
    event.alarm.action = 'DISPLAY'
    event.alarm.summary = 'Reminder: ' + subject
    event.alarm.trigger = '-PT5M' # 60 minutes before
    event
    @calendar.add event
    @calendar.publish
    file = File.new("tmp/ics_files/#{@interview.id}.ics", "w+")
    file.write(@calendar.to_ical)
    file.close
    attachments['schedule.ics'] = {:mime_type=>'text/calendar', :content => File.read("tmp/ics_files/#{@interview.id}.ics")}
    mail({
        :to=> 'sahmed@folio3.com',
        :subject => subject}) do |format|
      format.html {render :inline => text + send_mail_to}
    end
  end

  def new_company(user, password)
    set_new_company_mailer_settings!
    data = File.read(Rails.root.join('app/assets/images/folio3-mail.png'))
    attachments.inline['logo.png'] = { :data => data, :mime_type => "image/png",
      :encoding => "base64"}
    data_fb = File.read(Rails.root.join('app/assets/images/facebook.png'))
    attachments.inline['facebook.png'] = { :data => data_fb, :mime_type => "image/png",
      :encoding => "base64"}
    data_tw = File.read(Rails.root.join('app/assets/images/twitter.png'))
    attachments.inline['twitter.png'] = { :data => data_tw, :mime_type => "image/png",
      :encoding => "base64"}
    data_li = File.read(Rails.root.join('app/assets/images/linkedin.png'))
    attachments.inline['linkedin.png'] = { :data => data_li, :mime_type => "image/png",
      :encoding => "base64"}
    @user = user
    @password = password
    content_type "text/html"
    mail(:to=> @user.email, :subject => "Hirematics Job Portal")
  end
  private
  def set_mailer_settings!
    @sender = Sender.find(:first, :conditions => "id != 0")
    ActionMailer::Base.smtp_settings = {
      :address        => @sender.address,
      :port           => @sender.port,
      :domain         => @sender.domain,
      :authentication => :login,
      :user_name      => @sender.username,
      :password       => @sender.password
    }
  end
  def set_new_company_mailer_settings!
    @sender = Sender.find(:first, :conditions => "id != 0")
    ActionMailer::Base.smtp_settings = {
      :address        => "smtp.gmail.com",
      :port           => 587,
      :domain         => "mail.google.com",
      :authentication => :login,
      :user_name      => 'hirematics.folio3@gmail.com',
      :password       => 'click123'
    }
  end
end