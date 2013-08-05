class Candidate < ActiveRecord::Base
  if current_user.company_id?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  belongs_to	:job
  belongs_to	:candidate_status
  has_many		:evaluations
  has_many		:activity_logs
  has_many    :interviews
  
  validates :email, :presence => true ,:format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create } , :uniqueness => true
  validates :candidate_status_id, :numericality => true
  validates :job_id, :presence => true, :numericality => true
  validates :first_name, :presence => true
  validates :last_name, :presence => true
  validates :phone, :presence => true, :numericality => true , :uniqueness => true, :length => {:is => 11}
  #  validates :resume_file_name, :presence => true, :message => "Resume must be attached"

  has_attached_file	:resume
  validates_attachment_presence :resume, :message => "must be attached"
  validates_attachment_content_type :resume, :content_type => ["application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.oasis.opendocument.text "], :message => 'should be PDF, WORD or ODT files'

  def name
    "#{first_name} #{last_name}"
  end

  def status
    if candidate_status_id == 0
      "New"
    else
      candidate_status.name
    end
  end
  def source_name
    _source = source.to_i
    _referral = referral.to_i
    if (_referral != 0 )
      "#{Source.find(_source).try(:name)} #{User.find(_referral).try(:name)}"
    else
      if(_source != 0)
        "#{Source.find(_source).try(:name)}"
      else
        if(employee_reference)
          employee_reference
        end
      end
    end
   
  end
  def to_csv
    source_name
    "#{name},#{job.title},#{created_at.strftime("%d %b %Y")},#{status},#{notify},#{source_name},#{tags}"
  end
  def self.options_for_select_evaluation_type
    opt = [  "Dawn Ad","Folio3 employee","Folio3 website","Rozee.pk Ad","Word of mouth","Random"]
    #    opt << ["---------------------", ""]
    #    opt << ["Dawn Ad", ""]
    #    Dawn Ad
    #    Folio3 employee
    #    Folio3 website
    #    Rozee.pk Ad
    #    Word of mouth
    #    Random
  end
end