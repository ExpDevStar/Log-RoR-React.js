class RunsController < ApplicationController
	def new
		@run = Run.new
	end

	def create
		@run = Run.new(run_params(params[:run]))
		if @run.save
			render :json => Run.find_all_by_user_id(session[:user])
		else
		end
	end


	def filter
		@runs = Run.find_all_by_user_id(params[:id])
	end
	private

	def run_params(params)
		return params.permit(:user_id, :date_time, :distance, :name)
	end
end
