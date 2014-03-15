class TasksController < ApplicationController

	def index
	end

	def new
		render json: Task.all.order(:id)
	end

	def create
		@task = Task.create(todo: params[:todo], completed: false)
		render json: @task
	end

  def update
    # binding.pry
    @task = Task.find(params[:id].to_i)
    @task.update(completed: params[:completed])
    render json: @task
  end

end