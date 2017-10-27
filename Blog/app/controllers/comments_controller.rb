class CommentsController < ApplicationController
  before_action :find_post, only: [:create]
  before_action :find_comment, only: [:destroy]
  before_action :authenticate_user!,

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user =current_user
    if(@comment.save)
      redirect_to post_path(@post)
    else
      render post_path(@post)
    end
  end

  def destroy
    @comment.destroy
    redirect_to post_path(@comment.post)
  end



  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_comment
    @comment= Comment.find(params[:id])
  end
end
