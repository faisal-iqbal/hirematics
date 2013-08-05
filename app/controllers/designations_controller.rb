class DesignationsController < ApplicationController
  before_filter :allow_admin!
  active_scaffold :designation do |conf|
    conf.columns.exclude :created_at, :updated_at
  end
  private
  def allow_admin!
    unless current_user.admin?
      redirect_to root_path, :notice => "Login as Administrator to manage designation settings"
    end
  end
end