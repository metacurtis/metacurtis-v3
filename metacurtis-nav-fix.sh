#!/bin/bash

# MetaCurtis Navigation Fix Script
# Purpose: Fix navigation scrolling with react-scroll library

# Define colors for better output readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define project directories
PROJECT_ROOT="$(pwd)"
SRC_DIR="$PROJECT_ROOT/src"
COMPONENTS_DIR="$SRC_DIR/components"

# Log function for better output
log() {
  echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Error function for error reporting
error() {
  echo -e "${RED}[ERROR]${NC} $1"
  exit 1
}

# Success function for confirming operations
success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Warning function for potential issues
warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Navigate to project root
cd "$PROJECT_ROOT" || error "Failed to navigate to project root"
log "Starting navigation fix in $(pwd)"

# Step 1: Create a Git backup
log "Creating Git backup..."
git add . && git commit -m "Backup before adding react-scroll navigation" || warning "Git backup failed or nothing to commit"

# Step 2: Install react-scroll if not installed
log "Checking if react-scroll is installed..."
if ! grep -q '"react-scroll"' package.json; then
  log "Installing react-scroll..."
  npm install react-scroll || error "Failed to install react-scroll"
  success "react-scroll installed successfully"
else
  success "react-scroll is already installed"
fi

# Step 3: Find the Navbar component
log "Looking for Navbar component..."
NAVBAR_FILES=$(find "$SRC_DIR" -type f -name "Navbar.jsx" -o -name "NavBar.jsx" -o -name "Navigation.jsx")

if [ -z "$NAVBAR_FILES" ]; then
  error "Could not find Navbar component. Please specify the path manually."
fi

# Iterate through potential navbar files
for NAVBAR_PATH in $NAVBAR_FILES; do
  log "Examining potential Navbar component: $NAVBAR_PATH"
  
  # Check if this looks like a navbar (contains navigation-related code)
  if grep -q "nav" "$NAVBAR_PATH"; then
    log "Found likely Navbar component at: $NAVBAR_PATH"
    
    # Backup the file
    cp "$NAVBAR_PATH" "${NAVBAR_PATH}.bak" || error "Failed to backup Navbar component"
    success "Backed up Navbar component to ${NAVBAR_PATH}.bak"
    
    # Check if the file already imports react-scroll
    if grep -q "react-scroll" "$NAVBAR_PATH"; then
      warning "This file already imports react-scroll. Skipping import addition."
    else
      # Add import for react-scroll at the top of the file
      log "Adding react-scroll import..."
      
      # Create a temporary file with the new import added
      TEMP_FILE=$(mktemp)
      echo 'import { Link as ScrollLink } from "react-scroll";' > "$TEMP_FILE"
      cat "$NAVBAR_PATH" >> "$TEMP_FILE"
      mv "$TEMP_FILE" "$NAVBAR_PATH"
      
      success "Added react-scroll import to $NAVBAR_PATH"
    fi
    
    # Step 4: Update any existing navigation links
    log "Updating navigation links to use ScrollLink..."
    
    # Create a backup copy to work with
    TEMP_FILE=$(mktemp)
    cp "$NAVBAR_PATH" "$TEMP_FILE"
    
    # Replace anchor tags that have href="#something" with ScrollLink
    # This is a complex transformation, doing it in multiple steps
    
    # First, look for navigation items array if it exists
    if grep -q "navItems\|menuItems\|navigationItems" "$NAVBAR_PATH"; then
      log "Found navigation items array, updating..."
      
      # Update href prop to 'to' prop in navigation items
      sed -i 's/href: *["'"'"']#\([^"'"'"']*\)["'"'"']/to: "\1"/g' "$NAVBAR_PATH"
      
      # Update any remaining href="#X" to to="X"
      sed -i 's/href=["'"'"']#\([^"'"'"']*\)["'"'"']/to="\1"/g' "$NAVBAR_PATH"
      
      success "Updated navigation item properties"
    fi
    
    # Replace <a> tags with <ScrollLink> for navigation
    log "Replacing <a> tags with <ScrollLink>..."
    
    # This is a complex replacement that needs to handle multiline tags
    # Using a more targeted approach
    
    # Find anchor tags with href="#something" and convert to ScrollLink
    # This is simplified and may need manual adjustments
    sed -i 's/<a\([^>]*\)href=["'"'"']#\([^"'"'"']*\)["'"'"']\([^>]*\)>/\<ScrollLink\1to="\2"\3 spy={true} smooth={true} duration={500} offset={-70}/g' "$NAVBAR_PATH"
    
    # Replace closing </a> tags with </ScrollLink>
    sed -i 's/<\/a>/<\/ScrollLink>/g' "$NAVBAR_PATH"
    
    # Additional common patterns
    sed -i 's/onClick={(e) => [^}]*}//g' "$NAVBAR_PATH" # Remove any onClick handlers
    
    success "Replaced anchor tags with ScrollLink components"
    
    log "Checking for navigation click handlers..."
    # If there are onClick or handleClick functions for navigation, add a note about removing them
    if grep -q "scrollToSection\|handleNavClick\|navClick" "$NAVBAR_PATH"; then
      warning "Found navigation click handlers that may no longer be needed with react-scroll."
      warning "You may want to remove these functions manually as they're replaced by react-scroll's functionality."
    fi
    
    # Note: The automatic replacement may not be perfect due to the variety of ways
    # navigation can be implemented. Provide instructions for manual verification.
    warning "The automatic replacement of navigation links may not be complete."
    warning "Please review the Navbar component manually to ensure all links are properly converted."
    
    # Break after processing the first matching file
    break
  fi
done

# Step 5: Provide guidance for manual verification and fixes
cat << 'EOF'

======== NEXT STEPS ========

1. Check your Navbar component for any manual adjustments needed:
   - Make sure all navigation links use ScrollLink instead of <a>
   - Verify all links have the required props: to, spy, smooth, duration, offset
   - Example:
     
     <ScrollLink
       to="about"
       spy={true}
       smooth={true}
       duration={500}
       offset={-70}
       className="your-classes-here"
     >
       About
     </ScrollLink>

2. Run your development server:
   npm run dev

3. Test navigation by clicking each link to verify smooth scrolling

4. If you encounter issues, you can:
   - Check browser console for errors
   - Restore from backup: cp [navbar-path].bak [navbar-path]
   - Make manual adjustments as needed

5. Once everything works, commit your changes:
   git add .
   git commit -m "Improved navigation with react-scroll"

======== COMMON ISSUES ========

1. "ScrollLink is not defined" - Verify the import is at the top of your file
2. Scrolling to wrong position - Adjust the offset value (default -70)
3. Links not working - Ensure section IDs match the 'to' props exactly
4. Mobile menu not closing - Add onClick={() => setIsOpen(false)} to mobile menu ScrollLinks

EOF

# Final success message
success "Navigation fix script completed!"
