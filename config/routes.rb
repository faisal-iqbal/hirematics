JobPortal::Application.routes.draw do

  get "home_page/index"

  devise_for :users

  #landing page
  root :to => 'home_page#index'

  resources :jobs
  match '/jobs_new_department' => 'jobs#new_department'
  match '/jobs_create_department' => 'jobs#create_department'
  match '/jobs_new_location' => 'jobs#new_location'
  match '/jobs_create_location' => 'jobs#create_location'
  match '/jobs_del_confirm_popup/:id' => 'jobs#delete_confirmation_popup'
  match '/job_update_status/:id/:status' => 'jobs#update_status'
  match 'facebook_status_popup/:id' => 'jobs#facebook_status_popup'
  match 'twitter_status_popup/:id' => 'jobs#twitter_status_popup'
  match 'linkedin_status_popup/:id' => 'jobs#linkedin_status_popup'

  resources :candidates
  match '/candidate_export' => 'candidates#export', :as => :candidate_export
  match '/candidate_del_confirm_popup/:id' => 'candidates#delete_confirmation_popup'
  match '/evaluation_listing/:id' => 'candidates#evaluation_listing'
  match '/add_evaluation/:id' => 'candidates#add_evaluation'
  match '/add_evaluation_popup/:id' => 'candidates#add_evaluation_popup'
  match '/edit_evaluation' => 'candidates#edit_evaluation'
  match '/edit_evaluation_popup/:id' => 'candidates#edit_evaluation_popup'
  match '/edit_interview' => 'candidates#edit_interview'
  match '/edit_interview_popup/:id' => 'candidates#edit_interview_popup'
  match '/interview_del_confirm_popup/:id' => 'candidates#delete_interview_confirmation_popup'
  match '/del_interview' => 'candidates#delete_interview'
  match '/add_simple_evaluation_popup/:id' => 'candidates#add_simple_evaluation_popup'
  match '/create_evaluation' => 'candidates#create_evaluation'
  match '/interview_listing/:id' => 'candidates#interview_listing'
  match '/add_interview/:id' => 'candidates#add_interview'
  match '/add_interview_popup/:id' => 'candidates#add_interview_popup'
  match '/create_interview' => 'candidates#create_interview'
  match '/app/mark_as_read' => 'candidates#mark_as_read'
  match '/mail' => 'candidates#send_mail'
  match '/auth/twitter/callback' => 'candidates#disp'
  match '/auth/facebook/callback' => 'candidates#disp'

  resources :companies do as_routes end
  match '/create_company/:id' => 'companies#create_company_popup'
  match '/create' => 'companies#create'
  match '/companies_listing' => 'companies#companies_listing'
  match '/set_company_id/:id' => 'companies#set_company_id'
  
  resources :packages
  match '/package_listing' => 'packages#package_listing'
 
  #reports
  match '/dashboard' => 'reports#dashboard'
  match '/reports/jobs' => 'reports#jobs'
  match '/reports/employee_referral' => 'reports#employee_referral'
  match '/reload' => 'reports#reload'

  resources :members
  resources :senders
  resources :tags
  resources :emails
  resources :locations do as_routes end
  resources :categories do as_routes end
  resources :departments do as_routes end
  resources :candidate_statuses do as_routes end
  resources :designations do as_routes end
  resources :evaluation_names do as_routes end
  resources :sources do as_routes end
  resources :authentications do as_routes end
  resources :senders do as_routes end
  
  # Public Routes Begin
  match '/job_board' => 'jobs#job_board', :as => :job_board
  match '/apply' => 'candidates#apply', :as => :apply
  # Public Routes End
  
  match ':controller(/:action(/:id(.:format)))'
end
