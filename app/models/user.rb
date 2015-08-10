class User < ActiveRecord::Base

  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  #class methods

  def self.generate_session_token
    SecureRandom::urlbase_safe64
  end

  def self.find_by_credentials(username,password)
    @user = User.find_by_username(username);
    if @user && @user.is_password?(password)
      @user
    else
      nil
    end
  end

  #instance methods

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.generate(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    return self
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
