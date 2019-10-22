require 'jwt'

class Auth

  ALGORITHM = "HS256"

  def self.issue(payload)
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM
    )
  end

  def self.decode(token)
    decoded_t = JWT.decode(
      token,
      auth_secret,
      true,
      { algorithm: ALGORITHM }
    ).first
    puts "Decoded = " + decoded_t["user"]
    return decoded_t
  end

  def self.auth_secret
    ENV["SECRET_BASE"]
  end

end
