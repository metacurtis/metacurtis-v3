#!/bin/bash

# MetaCurtis Navigation and Section ID Alignment Fix
# This script aligns section IDs with navigation link references

# Define colors for better output readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define project directories
PROJECT_ROOT="/home/curtis/projects/metacurtis-v3"
SRC_DIR="$PROJECT_ROOT/src"
COMPONENTS_DIR="$SRC_DIR/components"
SECTIONS_DIR="$COMPONENTS_DIR/sections"
NAVBAR_PATH="$COMPONENTS_DIR/Navbar.jsx"

# Log function for better output
log() { echo -e "${BLUE}[LOG]${NC} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Navigate to project root
cd "$PROJECT_ROOT" || error "Failed to navigate to project root"
log "Starting navigation and section ID alignment fix in $(pwd)"

# Step 1: Create a Git backup
log "Creating Git backup..."
git add . && git commit -m "Backup before section ID alignment" || warning "Git backup failed or nothing to commit"

# Step 2: Backup Navbar component
if [ -f "$NAVBAR_PATH" ]; then
  log "Backing up Navbar component..."
  cp -f "$NAVBAR_PATH" "$NAVBAR_PATH.bak" || error "Failed to backup Navbar component"
  success "Backed up Navbar component to $NAVBAR_PATH.bak"
else
  warning "Navbar component not found at expected location. Searching..."
  NAVBAR_PATH=$(find "$SRC_DIR" -name "Navbar.jsx" | head -n 1)
  
  if [ -n "$NAVBAR_PATH" ]; then
    log "Found Navbar component at $NAVBAR_PATH"
    cp -f "$NAVBAR_PATH" "$NAVBAR_PATH.bak" || error "Failed to backup Navbar component"
    success "Backed up Navbar component to $NAVBAR_PATH.bak"
  else
    error "Could not find Navbar component. Please check your project structure."
  fi
fi

# Step 3: Verify section component files exist
log "Verifying section component files..."

ABOUT_SECTION_PATH="$SECTIONS_DIR/AboutSection.jsx"
METACURTIS_SECTION_PATH="$SECTIONS_DIR/MetaCurtisSection.jsx"
VERSION3_SECTION_PATH="$SECTIONS_DIR/Version3Section.jsx"

if [ ! -f "$ABOUT_SECTION_PATH" ]; then
  error "AboutSection.jsx not found at $ABOUT_SECTION_PATH"
fi

if [ ! -f "$METACURTIS_SECTION_PATH" ]; then
  error "MetaCurtisSection.jsx not found at $METACURTIS_SECTION_PATH"
fi

if [ -f "$VERSION3_SECTION_PATH" ]; then
  log "Found Version3Section.jsx"
else
  VERSION3_SECTION_PATH=$(find "$SECTIONS_DIR" -name "*Version*3*.jsx" | head -n 1)
  if [ -n "$VERSION3_SECTION_PATH" ]; then
    log "Found Version3 section at $VERSION3_SECTION_PATH"
  else
    warning "Could not find Version3Section.jsx. Continuing anyway..."
  fi
fi

# Step 4: Update section IDs in each component
log "Updating section IDs in component files..."

# Function to update section ID in a component file
update_section_id() {
  local file=$1
  local id=$2
  
  log "Updating section ID in $file to '$id'..."
  
  # Check if the file contains a section tag
  if grep -q "<section" "$file"; then
    # Check if the section already has an ID attribute
    if grep -q "id=" "$file"; then
      # Replace existing ID
      sed -i "s/<section[^>]*id=[\"'][^\"']*[\"']/<section id=\"$id\"/g" "$file"
    else
      # Add ID attribute to section tag
      sed -i "s/<section/<section id=\"$id\"/g" "$file"
    fi
    
    success "Updated section ID in $file"
  else
    warning "No section tag found in $file"
  fi
}

# Update the section IDs in each component
update_section_id "$ABOUT_SECTION_PATH" "about"
update_section_id "$METACURTIS_SECTION_PATH" "metacurtis"
[ -n "$VERSION3_SECTION_PATH" ] && update_section_id "$VERSION3_SECTION_PATH" "version3"

# Step 5: Update navigation links in Navbar.jsx
log "Updating navigation links in $NAVBAR_PATH..."

# Create a temporary file for the updated content
TEMP_FILE=$(mktemp)

# Update the navLinks array to align with section IDs
awk '
/const navLinks = \[/ {
  print "  const navLinks = [";
  print "    { name: \"Home\", to: \"hero\", color: \"#ffffff\", shadow: \"rgba(255, 255, 255, 0.7)\", borderColor: \"#888888\" },";
  print "    { name: \"Meta Curtis\", to: \"metacurtis\", color: \"#60a5fa\", shadow: \"rgba(96, 165, 250, 0.7)\", borderColor: \"#1e40af\" },";
  print "    { name: \"Version 3\", to: \"version3\", color: \"#34d399\", shadow: \"rgba(52, 211, 153, 0.7)\", borderColor: \"#065f46\" },";
  print "    { name: \"About\", to: \"about\", color: \"#a78bfa\", shadow: \"rgba(167, 139, 250, 0.7)\", borderColor: \"#5b21b6\" },";
  print "  ];";
  found=1;
  next;
}
/\];/ {
  if (found) { found=0; next; }
}
!found { print; }
' "$NAVBAR_PATH" > "$TEMP_FILE"

# Check if the navLinks array was found and updated
if grep -q "metacurtis" "$TEMP_FILE" && grep -q "to: \"about\"" "$TEMP_FILE"; then
  mv "$TEMP_FILE" "$NAVBAR_PATH"
  success "Updated navigation links in Navbar.jsx"
else
  # If automated replacement failed, try a simpler approach
  log "Simple pattern matching failed, attempting direct replacements..."
  
  # Replace specific navigation entries
  sed -i 's/to: "meta-curtis"/to: "metacurtis"/g' "$NAVBAR_PATH"
  sed -i 's/to: "contact"/to: "about"/g' "$NAVBAR_PATH"
  
  # Check if the replacements were successful
  if grep -q "to: \"metacurtis\"" "$NAVBAR_PATH" && grep -q "to: \"about\"" "$NAVBAR_PATH"; then
    success "Updated navigation links using direct replacements"
  else
    warning "Could not automatically update navigation links. Please update them manually."
    warning "Update 'to: \"meta-curtis\"' to 'to: \"metacurtis\"' and 'to: \"contact\"' to 'to: \"about\"'"
  fi
  
  rm "$TEMP_FILE"
fi

# Step 6: Add offset to Link components if not present
log "Adding offset to Link components..."

if ! grep -q "offset=" "$NAVBAR_PATH"; then
  sed -i 's/smooth={true}/smooth={true} offset={-70}/g' "$NAVBAR_PATH"
  success "Added offset to Link components"
else
  success "Offset already present in Link components"
fi

# Step 7: Provide summary and instructions
cat << 'EOF'

✅ SECTION ID ALIGNMENT FIX COMPLETE

Changes made:
1. Updated section IDs in component files:
   - AboutSection.jsx: id="about"
   - MetaCurtisSection.jsx: id="metacurtis"
   - Version3Section.jsx: id="version3" (if found)

2. Updated navigation links in Navbar.jsx to match these IDs
3. Added offset to Link components to prevent navbar overlap

Next steps:
1. Run your development server:
   npm run dev

2. Test each navigation button to verify smooth scrolling to the correct sections

3. If scrolling still doesn't work properly:
   - Check browser console for errors
   - Verify that all section IDs match the navigation link 'to' properties exactly
   - Try adjusting the offset value (currently -70) in the Link components

4. If everything works as expected, commit your changes:
   git add .
   git commit -m "Fixed navigation and section ID alignment"

EOF

success "Section ID alignment fix completed!"
