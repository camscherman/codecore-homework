class PostsController < ApplicationController
  before_action :find_post , only:[:show, :edit, :update, :destroy]
  before_action :authorize_user!, except: [:new, :create ,  :show, :index]
  before_action :authenticate_user!, except: [:index, :show]


  def new
    @post = Post.new
  end

  def create
    @post = Post.new(get_params)
    @post.user = current_user
    
    if(@post.save)
      redirect_to posts_path
    else
      render :new
    end
  end

  def index
    @posts = Post.all.order(created_at: :desc).limit(10)
  end

  def show
    @comment = Comment.new
    @comments = Comment.all
  end

  def edit
  end

  def update

    if(@post.update get_params)
      redirect_to posts_path
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path
  end

  private

  def get_params
    params.require(:post).permit(:title, :body)
  end

  def find_post
    @post = Post.find(params[:id])
  end

  def authorize_user!
    unless can?(:manage, @post)
      flash[:alert] = "Access denied"
      redirect_to root_path
    end
  end

end
