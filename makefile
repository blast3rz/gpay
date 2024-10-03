# Makefile for automatic Git operations

# Default target
all: git-ops

# Target for Git operations
git-ops:
	@echo "Performing Git operations..."
	git add .
	@read -p "Enter commit message: " message; \
	git commit -m "$$message"
	git push
	@echo "Git operations completed."

# Help target
help:
	@echo "Usage: make [target]"
	@echo "Targets:"
	@echo "  all (default) - Perform Git operations"
	@echo "  help          - Display this help message"

.PHONY: all git-ops help