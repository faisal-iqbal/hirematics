class CategoriesController < ApplicationController
  before_filter :allow_admin!
  active_scaffold :category do |conf|
    conf.columns.exclude :parent
  end
  private
  def allow_admin!
    unless current_user.admin?
      redirect_to root_path, :notice => "Login as Administrator to manage category settings"
    end
  end
end 