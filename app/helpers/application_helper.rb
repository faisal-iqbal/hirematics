module ApplicationHelper
  def errors_for(object, message=nil)
    render :partial => "shared/object_errors", :locals => {:object => object, :message => message}
  end 
end
