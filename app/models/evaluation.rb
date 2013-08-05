class Evaluation < ActiveRecord::Base
  if current_user.company_id?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  belongs_to  :candidate
  has_attached_file	:document

  validates :content, :presence => true
  def self.options_for_select
    opt = []
    User.all.each{|u| opt << [u.first_name, u.id]}
  end
end
