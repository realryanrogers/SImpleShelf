require 'jwt'

class Auth

  ALGORITHM = "HS256"

  def self.issue(payload)
    #encodes the users public_user_id
    puts "HERE"
    puts payload
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM
    )
  end

  def self.decode(token)
    #send back the users public_user_id
    decoded_t = JWT.decode(
      token,
      auth_secret,
      true,
      { algorithm: ALGORITHM }
    ).first["user"]
    puts "Decoded = " + decoded_t
    return decoded_t
  end

  def self.auth_secret
    ENV["AUTH_SECRET_KEY"]
  end

end
