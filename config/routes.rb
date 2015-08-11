Rails.application.routes.draw do
  resources :users
  resource :session
  root to: 'static_pages#root'
end
