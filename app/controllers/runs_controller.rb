class RunsController < ApplicationController
	def new
		@run = Run.new
	end

	def create

	end


	def filter
		@runs = Run.find_all_by_user_id(params[:id])
	end
	private

	def run_params
		return params.permit(:user_id, :date_time, :distance, :name)
	end
end
