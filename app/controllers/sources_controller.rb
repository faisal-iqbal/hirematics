class SourcesController < ApplicationController
  before_filter :allow_admin!
  active_scaffold :source do |conf|
    conf.columns.exclude :created_at, :updated_at
  end
  private
  def allow_admin!
    unless current_user.admin?
      redirect_to root_path, :notice => "Login as Administrator to manage source of CV settings"
    end
  end
end 