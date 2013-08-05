module CategoriesHelper
  def set_company_id
    hidden_field :company_id, :value => current_user.comapny_id
  end
end