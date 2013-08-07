class Location < ActiveRecord::Base
  if current_user.present? and current_user.company_id.present?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  before_validation :strip_whitespace

  validates :country, :presence => true
  validates :city, :presence => true

  def strip_whitespace
    self.attributes.each_pair do |key, value|
    self[key] = value.strip if value.respond_to?('strip')
    end
  end

  def self.options_for_select
    opt = []
    Location.all.each{|l| opt << [l.city, l.id]}
    opt << ["--------------------", ""]
    opt << ["Add New Location", "add_new"]
  end

  def name
    [address1,address2,zip,city,country].compact.join(', ')
  end
end
