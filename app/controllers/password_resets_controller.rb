class PasswordResetsController < ApplicationController
    skip_before_action :authenticate
    before_action :set_user, only: [:edit]
    KEYS = [:password, :password_confirmation].freeze

    def create
        user = User.find_by(email: params[:email])
        puts "Params: "
        puts params[:email]
        puts "----"

        if user
            user.generate_password_token!
            UserMailer.reset_password(user).deliver_now
        end
        render json: :ok
    end

    def edit
        puts @user
        render json: :ok
    end


    def set_user
        @user = User.find_by(reset_password_token: params[:token])
        raise ResetPasswordError unless @user&.reset_password_token_expires_at && @user.reset_password_token_expires_at > Time.now
    end

    def update
        @user = User.find_by(reset_password_token: params[:token])
        if !@user 
            puts "true"
            render json: {
                status: "Token Invalid"
            } 
        elsif @user.reset_password_token_expires_at < Time.now
            render json: {
                status: "Token Expired"
            } 
        elsif params[:password] != params[:password_confirmation]
            render json: {
                status: "Mismatched Passwords"
            }
        end
        @user.update!(password_params)
        @user.clear_password_token!
        render json: {
            status: "Password Reset"
        }
    end

    def edit
        render json: :ok
    end

    private

        def password_params
          params.tap { |p| p.require(KEYS) }.permit(*KEYS)
        end

        
end