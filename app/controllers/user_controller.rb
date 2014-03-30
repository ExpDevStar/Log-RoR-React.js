class UserController < ApplicationController
  def new
	@user = User.new
  end

  def create
  	@user = User.new(user_params(params[:user]))
  	if @user.save
		flash[:notice] = "Registration complete!"
		session[:user] = @user.id
		redirect_to "/user/index/"
  	else
		render(:action => :new)
  	end
  end

  def index
  	@runs = {
  		:runs => Run.find_all_by_user_id(session[:user]),
  		:form => {
  			:csrf_param => request_forgery_protection_token,
  			:csrf_token => form_authenticity_token
  		},
  		:edit => -1
  	}
  end

	def login
		if !session[:user].nil?
			flash[:notice] = "Already logged in.  Please log out to log in as a different user."
			redirect_to "/user/index/"
		else
			@user = User.new
		end
	end

	def post_login
		user = User.find_by_login(params[:user][:login])
		if user.nil?
			@error = "Login not found."
			@user = User.new
			@user.first_name = params[:user][:first_name]
			@user.last_name = params[:user][:last_name]
			render(:action => :login)
		else
			session[:user] = user.id
			redirect_to "/runs/index/"
		end
	end

	def logout
		reset_session
		flash[:notice] = "You have successfully logged out!"
		redirect_to(:action => :login)
	end

	private
	def user_params(params)
		return params.permit(:first_name, :last_name, :login)
	end
end
