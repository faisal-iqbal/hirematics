class DepartmentsController < ApplicationController
  before_filter :allow_admin!
  
  active_scaffold :department do |conf|
  end
  private
  def allow_admin!
    unless current_user.admin?
      redirect_to root_path, :notice => "Login as Administrator to manage department settings"
    end
  end
end 