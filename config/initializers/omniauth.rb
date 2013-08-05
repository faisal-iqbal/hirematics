Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, 'GEfFZMw5nuhBENgbIJXlkw', 'mURNbsHAGAvVhVGKQS2RRGVlhCnKp6HEHQJs5eZc4eI'
  provider :facebook, '529606273769019', 'd93cd5e04b473537840e15f867b6db65'
end

