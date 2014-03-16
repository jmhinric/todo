Todo::Application.routes.draw do
  root to: "tasks#index"

  resources :tasks, only: [:create, :new, :update, :destroy] do
  end

  # post 'newtodo' => 'tasks#create'
  # get 'new' => 'tasks#new'
  # post 'updatetodo' => 'tasks#update'
end
