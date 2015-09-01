Rails.application.routes.draw do
  resources :users
  resource :session
  namespace :api, defaults: { format: :json } do
    match 'puzzles/:id/fill_in_grid', to: 'puzzles#fill_in_grid', via: [:get]
    resources :users
    resources :puzzles
    resources :squares
    resources :clues
    resources :games
  end
  root to: 'static_pages#root'
end
