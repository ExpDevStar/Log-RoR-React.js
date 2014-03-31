class UserController < ApplicationController

	WELCOME_PAGE = 0
	REGISTRATION_PAGE = 1
	LOGIN_PAGE = 2

  def new
	@user = User.new
  end

  def create
  	@user = User.new(user_params(params))
  	if @user.save
		flash[:notice] = "Registration complete!"
		session[:user] = @user.id
		render :json => {:user_id => @user.id, :page => WELCOME_PAGE, :first_try => true}
  	else
  		#do some error thing
  	end
  end

  def index
  	if session.has_key?(:user)
  		user_id = session[:user]
  	else
  		user_id = -1
  	end
  	@data = {
  		:runs => Run.find_all_by_user_id(session[:user]),
  		:form => {
  			:csrf_param => request_forgery_protection_token,
  			:csrf_token => form_authenticity_token
  		},
  		:edit => -1,
  		:login => {
  			:user_id => user_id,
  			:page => WELCOME_PAGE,
  			:first_try => true
  		}
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
		user = User.find_by_login(params[:login])
		if user.nil?
			render :json => {:user_id => -1, :page => LOGIN_PAGE, :first_try => false}
		else
			render :json => {:user_id => user.id, :page => WELCOME_PAGE, :first_try => true}
		end
	end

	def logout
		reset_session
		render :json => {:user_id => -1, :page => WELCOME_PAGE, :first_try => true}
	end

	private
	def user_params(params)
		return params.permit(:first_name, :last_name, :login)
	end
end
