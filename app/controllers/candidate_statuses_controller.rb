class CandidateStatusesController < ApplicationController
  active_scaffold :candidate_status do |conf|
    conf.label = "Candidate Statuses"
    conf.columns.exclude :value
  end
end 