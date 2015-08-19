Rails.application.routes.draw do
  resources :users
  resource :session
  namespace :api, defaults: { format: :json } do
    match 'puzzles/:id/fill_in_grid', to: 'puzzles#fill_in_grid', via: [:get]
    match 'puzzles/:id/edit', to: 'puzzles#play', via: [:get]
    match 'puzzles/:id/play', to: 'puzzles#edit', via: [:get]
    resources :puzzles
    resources :squares
    resources :clues
    resources :games
  end
  root to: 'static_pages#root'
end
