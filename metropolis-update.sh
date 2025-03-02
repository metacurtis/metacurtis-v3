#!/bin/bash

# MetaCurtis UI Update Script
# Author: Curtis Whorton
# Purpose: Fix AboutSection styling and navigation scrolling issues

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
SECTIONS_DIR="$COMPONENTS_DIR/sections"
NAVBAR_PATH=$(find "$SRC_DIR" -name "Navbar.jsx" -o -name "NavBar.jsx" | head -n 1)

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
log "Starting UI update process in $(pwd)"

# Step 1: Backup the current state before making changes
log "Creating Git backup..."
git add . && git commit -m "Backup before UI adjustments - AboutSection and navigation" || warning "Git backup failed or nothing to commit"

# Step 2: Backup AboutSection component
ABOUT_SECTION_PATH="$SECTIONS_DIR/AboutSection.jsx"
if [ -f "$ABOUT_SECTION_PATH" ]; then
  log "Backing up AboutSection.jsx..."
  cp -f "$ABOUT_SECTION_PATH" "$ABOUT_SECTION_PATH.bak" || error "Failed to backup AboutSection.jsx"
  success "AboutSection.jsx backed up to AboutSection.jsx.bak"
else
  warning "AboutSection.jsx not found at $ABOUT_SECTION_PATH"
  ABOUT_SECTION_PATH=$(find "$SRC_DIR" -name "AboutSection.jsx" | head -n 1)
  if [ -n "$ABOUT_SECTION_PATH" ]; then
    log "Found AboutSection.jsx at $ABOUT_SECTION_PATH"
    cp -f "$ABOUT_SECTION_PATH" "$ABOUT_SECTION_PATH.bak" || error "Failed to backup AboutSection.jsx"
    success "AboutSection.jsx backed up to AboutSection.jsx.bak"
  else
    error "AboutSection.jsx not found in project"
  fi
fi

# Step 3: Update AboutSection with fixed styling
log "Updating AboutSection component..."
cat > "$ABOUT_SECTION_PATH" << 'EOF'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-black/70 flex items-center justify-center p-8 relative">
      {/* SEO Optimized Heading - hidden visually but available to search engines */}
      <h1 className="not-sr-only:hidden">MetaCurtis - Marine Veteran Using Meta Learning for AI-Enhanced Web Development and Digital Transformation</h1>
      
      {/* Background animation - with improved visibility */}
      <div 
        className="absolute inset-0 opacity-20 animate-gradient-shift"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          backgroundSize: '150% 150%',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl w-full z-10 mx-auto text-center"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mb-8"
        >
          The Meta Learning Revolution
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-purple-900/30 p-8 rounded-xl border border-purple-500/30 backdrop-blur"
        >
          <div className="space-y-6 mb-10">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Beyond Development: The Meta Learning Advantage</h3>
            
            <p className="text-white/80 text-lg text-center">
              From Marine Corps battlefield to Wells Fargo AVP to cutting-edge developer—my path exemplifies the power of meta learning. After facing two years of unemployment, I developed a system to master modern web frameworks in just <span className="text-purple-400 font-semibold">three weeks</span>—compressing what typically takes years into days.
            </p>
            
            <p className="text-white/80 text-lg text-center">
              As a 50-year-old African-American Marine veteran with a finance background, I bring perspectives rarely found in tech:
            </p>
            
            <ul className="space-y-3 text-white/80 text-lg mx-auto max-w-xl">
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">Meta Learning Methodology:</strong> The proven system that compressed years of learning into weeks</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">Military Precision:</strong> Projects executed with Marine Corps discipline and attention to detail</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">Executive Strategy:</strong> AVP-level financial expertise driving business results</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">AI-Accelerated Execution:</strong> Delivering extraordinary results at unprecedented speed</span>
              </li>
            </ul>
          </div>
          
          <div className="border-t border-purple-500/30 pt-8">
            <p className="text-white/90 text-lg mb-6 text-center">
              Ready to experience the meta advantage? Let's transform your learning curve and transcend ordinary business boundaries.
            </p>
            <div className="flex flex-col space-y-6">
              <motion.a
                href="mailto:curtiswhorton.now@gmail.com"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-purple-700/40 hover:bg-purple-700/70 rounded-lg border border-purple-500/30 text-white/90 text-center transition-duration-300 hover:text-white"
              >
                Start Your Meta Journey
              </motion.a>
              <div className="flex justify-center space-x-6">
                {['Twitter', 'LinkedIn', 'GitHub'].map((platform, index) => (
                  <motion.a
                    key={platform}
                    href={`https://${platform.toLowerCase()}.com/metacurtis`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-purple-700/40 rounded-full border border-purple-500/30 text-white/90 transition-duration-300"
                    aria-label={platform}
                  >
                    {platform[0]}
                  </motion.a>
                ))}
              </div>
              <p className="text-white/60 text-sm text-center">
                Email: <a href="mailto:curtiswhorton.now@gmail.com" className="text-purple-400 hover:text-purple-300 underline">curtiswhorton.now@gmail.com</a>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
EOF
success "Updated AboutSection with improved styling"

# Step 4: Update navigation component with proper scrolling
if [ -n "$NAVBAR_PATH" ]; then
  log "Found Navbar component at $NAVBAR_PATH"
  log "Backing up Navbar component..."
  cp -f "$NAVBAR_PATH" "$NAVBAR_PATH.bak" || error "Failed to backup Navbar component"
  
  log "Checking if scrollToSection function already exists..."
  if grep -q "scrollToSection" "$NAVBAR_PATH"; then
    warning "scrollToSection function already exists, skipping addition"
  else
    log "Adding scrollToSection function to Navbar component..."
    # Create a temporary file with the updated content
    TEMP_FILE=$(mktemp)
    
    # Find a good place to insert the scrollToSection function (after imports and before component return)
    awk '
    /import/ { print; imports=1; next }
    /function/ && imports && !func_added {
      print;
      print "  // Smooth scroll function for navigation";
      print "  const scrollToSection = (e, sectionId) => {";
      print "    e.preventDefault();";
      print "    const section = document.getElementById(sectionId);";
      print "    if (section) {";
      print "      // Smooth scroll to the section";
      print "      section.scrollIntoView({ behavior: \"smooth\" });";
      print "      ";
      print "      // Close mobile menu if it is open";
      print "      if (typeof setIsOpen === \"function\") {";
      print "        setIsOpen(false);";
      print "      }";
      print "    }";
      print "  };";
      print "";
      func_added=1;
      next;
    }
    { print }
    ' "$NAVBAR_PATH" > "$TEMP_FILE"
    
    # Check if the function was added
    if grep -q "scrollToSection" "$TEMP_FILE"; then
      mv "$TEMP_FILE" "$NAVBAR_PATH"
      success "Added scrollToSection function to Navbar component"
    else
      warning "Failed to add scrollToSection function automatically."
      warning "Please add the function manually as described in the documentation."
      rm "$TEMP_FILE"
    fi
  fi
  
  # Update navigation links to use scrollToSection
  log "Updating navigation links to use scrollToSection..."
  
  # Look for anchor tags with href="#something" and update them to use the scrollToSection function
  sed -i 's/href=["'\'']\(#[^"'\'']*\)["'\''][^>]*>/href="\1" onClick={(e) => scrollToSection(e, "\1".substring(1))}/g' "$NAVBAR_PATH"
  
  success "Updated navigation links in Navbar component"
else
  warning "Navbar component not found. Please add the scrollToSection function manually as described in the documentation."
fi

# Step 5: Verify section IDs in main components
log "Checking for section IDs in main components..."

# Create a function to check and fix section IDs
check_section_id() {
  local file=$1
  local section_name=$2
  local section_id=$3
  
  if grep -q "section" "$file" && grep -q "<${section_name}" "$file"; then
    log "Found ${section_name} in $file, checking for ID..."
    if grep -q "id=[\"']${section_id}[\"']" "$file"; then
      success "Section ID '${section_id}' found in $file"
    else
      log "Attempting to add ID '${section_id}' to ${section_name} in $file..."
      sed -i "s/<section\([^>]*\)>/<section id=\"${section_id}\"\1>/g" "$file"
      if grep -q "id=[\"']${section_id}[\"']" "$file"; then
        success "Added ID '${section_id}' to section in $file"
      else
        warning "Could not automatically add ID '${section_id}' to section in $file. Please add it manually."
      fi
    fi
  fi
}

# Find and check main sections
HOME_SECTION=$(find "$SECTIONS_DIR" -name "*Home*.jsx" -o -name "*Hero*.jsx" | head -n 1)
VERSION3_SECTION=$(find "$SECTIONS_DIR" -name "*Version3*.jsx" | head -n 1)

if [ -n "$HOME_SECTION" ]; then
  check_section_id "$HOME_SECTION" "section" "home"
else
  warning "Home/Hero section not found. Please ensure it has id='home' manually."
fi

if [ -n "$VERSION3_SECTION" ]; then
  check_section_id "$VERSION3_SECTION" "section" "version3"
else
  warning "Version3 section not found. Please ensure it has id='version3' manually."
fi

# Step 6: Summary and wrap-up
success "=== UI Update Summary ==="
success "✓ Updated AboutSection with improved styling"
success "✓ Added scrollToSection function to navigation (if found)"
success "✓ Updated navigation links to use scrollToSection (if found)"
success "✓ Checked and attempted to fix section IDs (if found)"

# Provide instructions for testing and committing
echo ""
log "Next steps:"
echo "1. Run 'npm run dev' to test the changes"
echo "2. Verify that the About section appears correctly with proper styling"
echo "3. Test navigation to ensure clicking on links scrolls to the correct sections"
echo "4. If everything looks good, commit the changes:"
echo "   git add ."
echo "   git commit -m \"UI Improvements: AboutSection styling and navigation scrolling\""
echo "   git push origin main"
echo ""
echo "If you encounter any issues, you can restore from the backup with:"
echo "  git reset --hard HEAD~1"
echo ""
echo "Or restore individual files:"
echo "  cp $ABOUT_SECTION_PATH.bak $ABOUT_SECTION_PATH"
if [ -n "$NAVBAR_PATH" ]; then
  echo "  cp $NAVBAR_PATH.bak $NAVBAR_PATH"
fi
echo ""

# Final success message
success "UI update process completed!"
