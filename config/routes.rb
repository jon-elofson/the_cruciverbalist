Rails.application.routes.draw do
  resources :users
  resource :session
  namespace :api, defaults: { format: :json } do
    resources :puzzles
  end
  root to: 'static_pages#root'
end
