class User < ActiveRecord::Base
#  default_scope where(:company_id => current_user.company_id)
  belongs_to  :designation
  belongs_to  :company
  has_many    :interviews
  has_many    :activity_logs
  has_many    :authentications
  
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :first_name, :last_name, :email, :phone, :designation_id,
    :password, :password_confirmation, :remember_me, :admin, :company_id
  
  def name
    "#{first_name} #{last_name}"
  end
end
