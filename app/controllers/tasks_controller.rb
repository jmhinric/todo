class TasksController < ApplicationController

  before_action :load_params, only: [:update, :destroy]

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
    # @task = Task.find(params[:id].to_i)
    @task.update(completed: params[:completed])
    render json: @task
  end

  def destroy
    @task.destroy
    render json: @task
  end

  private

  def load_params
    @task = Task.find(params[:id].to_i)
  end

end