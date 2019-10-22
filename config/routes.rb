Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :registrations, only: [:create]
  resources :sessions, only: [:create]
  resources :users, only: [:index, :show], param: :public_user_id do
    resources :medias
  end
  post '/login', to: "sessions#create"
  root to: "static#home"
end
