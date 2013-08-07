class Job < ActiveRecord::Base

  if current_user.present? and current_user.company_id.present?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  belongs_to	:department
  belongs_to	:location
  belongs_to	:category
  has_many		:candidates, :dependent => :destroy
  has_many		:questions, :dependent => :destroy

  validates :title, :presence => true, :uniqueness => true
  validates :department_id, :numericality => true
  validates :location_id, :presence => true, :numericality => true
  validates :category_id, :presence => true, :numericality => true
  validates :description, :presence => true


  has_attached_file	:evaluation
  validates_attachment_presence :evaluation, :message => "must be attached"

  JOB_STATUS = { :close => 0, :open => 1 }

  def self.options_for_select(status = nil)
    options = status.nil? ? Job.all : Job.all(:conditions => {:status => status})
    opt = {}
    options.group_by(&:status).each do |status, jobs|
      status = status == 1 ? "Open Jobs" : "Closed Jobs"
      opt[status] = jobs.map { |j| [j.title, j.id] }
    end
    opt
  end
  
  def candidates_count
    candidates.count
  end

  def old_candidates_count
    Candidate.count(:joins => :candidate_status, :conditions=>"candidates.job_id = #{id} and candidate_statuses.name != 'New Candidate'")
  end

  def new_candidates_count
    Candidate.count(:joins => :candidate_status, :conditions=>"candidates.job_id = #{id} and candidate_statuses.name = 'New Candidate'")
  end
end