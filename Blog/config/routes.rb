Rails.application.routes.draw do
  get('/posts/new', {to: 'posts#new', as: :new_post})
  post('/posts/', {to: 'posts#create', as: :posts})

  get('/posts/', {to:'posts#index'})

  get('/posts/:id', {to: 'posts#show', as: :post})

  get('/posts/:id/edit', {to: 'posts#edit', as: :edit_post})
  patch('/posts/:id', {to: 'posts#update'})
  delete('/posts/:id', {to: 'posts#destroy'})
  root('posts#index')

  resources :users, only:[:new,:create, :edit, :update]

  resource :session, only:[:new, :create, :destroy]

  resources :posts do
    resources :comments, shallow: true,  only:[:create, :destroy]
  end

  get('/users/password/:id', {to: 'users#edit_password', as: :edit_user_password})
  post('/users/password/:id', {to: 'users#update_password', as: :user_password})

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
