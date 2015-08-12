Rails.application.routes.draw do
  resources :users
  resource :session
  namespace :api, defaults: { format: :json } do
    resources :puzzles
    resources :squares
  end
  root to: 'static_pages#root'
end
