class RunsController < ApplicationController

	def new
		@run = Run.new
	end

	def create
		@run = Run.new(run_params(params))
		@run.user_id = session[:user]
		if @run.save
			render :json => Run.find_all_by_user_id(session[:user])
		else
		end
	end

	def update
		@run = Run.find(params[:id])
		if @run.update(run_params(params))
			render :json => Run.find_all_by_user_id(session[:user])
		else
			puts("Could not find the object to update")#error here
		end
	end


	def filter
		@runs = Run.find_all_by_user_id(params[:id])
	end
	private

	def run_params(params)
		return params.permit(:user_id, :name, :date, :distance, :start_time, :end_time, :notes)
	end
end
