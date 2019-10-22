class ApplicationController < ActionController::API
  #skip_before_action :verify_authenticity_token

  before_action :authenticate

  def logged_in?
    puts "checking current_user"
    !!current_user
  end

  def current_user
    if auth_present?
      puts "Auth present"
      user = User.find_by(public_user_id: auth["user"])
      puts "User " + user.public_user_id
      if user
        @current_user ||= user
      end
    end
  end

  def authenticate
     if logged_in?
     else
       render json: {error: "Unauthorized"}, status: 401
     end
  end

  private

    def token
      puts request.headers["HTTP-AUTHORIZATION"].scan(/Bearer(.*)$/).flatten.last.strip
      request.headers["HTTP-AUTHORIZATION"].scan(/Bearer(.*)$/).flatten.last.strip
    end

    def auth
      Auth.decode(token)
    end

    def auth_present?
      !!request.headers.fetch("HTTP-AUTHORIZATION", "").scan(/Bearer/).flatten.first
    end


end
