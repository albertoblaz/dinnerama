require 'parslet'

require_relative 'ingredient_importer/parser'
require_relative 'ingredient_importer/ingredient'

module Parslet
  class ParseFailed < StandardError
    alias_method :parse_failure_cause, :cause

    def cause
      nil
    end
  end
end

module IngredientImporter
  extend self

  @parser = Parser.new

  def self.parse(str)
    return nil if str.nil? || str.empty?
    parsed = @parser.parse(str)
    Ingredient.new(parsed[:name], parsed[:amount], !parsed[:optional].nil?)
  end
end