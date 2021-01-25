Rails.application.routes.draw do
  root to: 'dashboard#index'
  get 'dashboard/index'
  get 'dashboard/clicks'
  get 'dashboard/forms'
  get 'dashboard/behavior'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
