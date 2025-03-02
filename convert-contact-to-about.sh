#!/bin/bash

# MetaCurtis Comprehensive Contact to About Conversion Script
# Author: Curtis Whorton
# Version: 1.0
# Purpose: Convert ContactSection to AboutSection throughout the project

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
STYLES_PATH="$SRC_DIR/style.css"

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
log "Starting conversion process in $(pwd)"

# Step 1: Backup the current state before making changes
log "Creating Git backup..."
git add . && git commit -m "Backup before ContactSection to AboutSection conversion" || warning "Git backup failed or nothing to commit"

# Step 2: Identify all files that might need updates
log "Identifying files to update..."
find "$SRC_DIR" -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" \) -not -path "*/node_modules/*" > /tmp/files_to_check.txt
log "Found $(wc -l < /tmp/files_to_check.txt) files to examine"

# Step 3: Backup ContactSection component if it exists
if [ -f "$SECTIONS_DIR/ContactSection.jsx" ]; then
  log "Backing up ContactSection.jsx..."
  cp -f "$SECTIONS_DIR/ContactSection.jsx" "$SECTIONS_DIR/ContactSection.jsx.bak" || error "Failed to backup ContactSection.jsx"
  success "ContactSection.jsx backed up to ContactSection.jsx.bak"
else
  warning "ContactSection.jsx not found in expected location"
fi

# Step 4: Create the AboutSection component with meta learning content
log "Creating new AboutSection.jsx..."
cat > "$SECTIONS_DIR/AboutSection.jsx" << 'EOF'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      {/* SEO Optimized Heading - hidden visually but available to search engines */}
      <h1 className="not-sr-only:hidden">MetaCurtis - Marine Veteran Using Meta Learning for AI-Enhanced Web Development and Digital Transformation</h1>
      
      {/* Background animation */}
      <div 
        className="absolute inset-0 opacity-10 animate-gradient-shift"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          backgroundSize: '150% 150%',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl w-full z-10"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-6xl md:text-7xl font-bold text-white mb-8"
        >
          The Meta Learning Revolution
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-purple-500/20 backdrop-blur"
        >
          <div className="space-y-6 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Beyond Development: The Meta Learning Advantage</h3>
            
            <p className="text-white/70 text-lg">
              From Marine Corps battlefield to Wells Fargo AVP to cutting-edge developer—my path exemplifies the power of meta learning. After facing two years of unemployment, I developed a system to master modern web frameworks in just <span className="text-purple-400 font-semibold">three weeks</span>—compressing what typically takes years into days.
            </p>
            
            <p className="text-white/70 text-lg">
              As a 50-year-old African-American Marine veteran with a finance background, I bring perspectives rarely found in tech:
            </p>
            
            <ul className="space-y-3 text-white/70 text-lg">
              <li className="flex gap-2">
                <span className="text-purple-400">➤</span> 
                <span><strong className="text-white">Meta Learning Methodology:</strong> The proven system that compressed years of learning into weeks</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">➤</span> 
                <span><strong className="text-white">Military Precision:</strong> Projects executed with Marine Corps discipline and attention to detail</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">➤</span> 
                <span><strong className="text-white">Executive Strategy:</strong> AVP-level financial expertise driving business results</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">➤</span> 
                <span><strong className="text-white">AI-Accelerated Execution:</strong> Delivering extraordinary results at unprecedented speed</span>
              </li>
            </ul>
          </div>
          
          <div className="border-t border-purple-500/20 pt-8">
            <p className="text-white/90 text-lg mb-6">
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
                className="w-full p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-white/70 text-center transition-duration-300 hover:bg-purple-700 hover:text-white"
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
                    className="p-4 bg-purple-900/20 rounded-full border border-purple-500/20 text-white/70 transition-duration-300"
                    aria-label={platform}
                  >
                    {platform[0]}
                  </motion.a>
                ))}
              </div>
              <p className="text-white/50 text-sm text-center">
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
success "Created new AboutSection.jsx with meta learning content"

# Step 5: Add CSS for gradient animation to styles.css
log "Adding gradient animation CSS to styles.css..."
if ! grep -q "animate-gradient-shift" "$STYLES_PATH"; then
  cat >> "$STYLES_PATH" << 'EOF'

/* Meta Learning gradient animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.animate-gradient-shift {
  animation: gradient-shift 15s ease infinite alternate;
}

/* Improved accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-gradient-shift {
    animation: none;
  }
}
EOF
  success "Added gradient animation CSS to styles.css"
else
  warning "Gradient animation CSS already exists in styles.css"
fi

# Step 6: Handle the sections index.jsx file specially
log "Updating sections index.jsx file..."
SECTIONS_INDEX="$SECTIONS_DIR/index.jsx"
if [ -f "$SECTIONS_INDEX" ]; then
  # Create a backup of the original file
  cp "$SECTIONS_INDEX" "${SECTIONS_INDEX}.bak"
  
  # Update the export statements
  sed -i 's/export { default as ContactSection } from "\.\/ContactSection";/export { default as AboutSection } from "\.\/AboutSection";/g' "$SECTIONS_INDEX"
  
  # If the file still refers to ContactSection, we need a more targeted approach
  if grep -q "ContactSection" "$SECTIONS_INDEX"; then
    log "Performing detailed update of sections index.jsx..."
    # Read the file line by line and make targeted replacements
    while IFS= read -r line; do
      if [[ "$line" == *"ContactSection"* && "$line" == *"export"* ]]; then
        # Replace ContactSection with AboutSection in export statements
        echo "$line" | sed 's/ContactSection/AboutSection/g'
      else
        # Keep other lines unchanged
        echo "$line"
      fi
    done < "${SECTIONS_INDEX}.bak" > "$SECTIONS_INDEX"
  fi
  
  success "Updated sections index.jsx file"
else
  warning "Sections index.jsx file not found"
fi

# Step 7: Update all imports, exports, and component references
log "Updating all imports, exports, and component references..."

# Handle imports
log "Updating import statements..."
grep -l "import.*ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/import[[:space:]]*{[[:space:]]*ContactSection[[:space:]]*}/import { AboutSection }/g' {}
grep -l "import.*ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/import[[:space:]]*ContactSection[[:space:]]*from/import AboutSection from/g' {}

# Handle imports with destructuring that might include ContactSection
grep -l "import.*{.*ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/\(import[[:space:]]*{[[:space:]]*\)ContactSection\([[:space:]]*,\)/\1AboutSection\2/g' {}
grep -l "import.*{.*ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/\(import[[:space:]]*{.*,[[:space:]]*\)ContactSection\([[:space:]]*}\)/\1AboutSection\2/g' {}

# Handle path references
grep -l "from.*ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/from[[:space:]]*["'\'']\.\/ContactSection["'\'']/from ".\/AboutSection"/g' {}
grep -l "from.*ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i "s/from[[:space:]]*['\"]\\.\\.\\/ContactSection['\"]\\([[:space:]]*\\)/from \"..\/AboutSection\"\1/g" {}

# Handle component usage in JSX
log "Updating component usage in JSX..."
grep -l "<ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/<ContactSection/<AboutSection/g' {}
grep -l "</ContactSection>" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/<\/ContactSection>/<\/AboutSection>/g' {}

# Handle section IDs, href references, and navigation labels
log "Updating section IDs, hrefs, and navigation labels..."
grep -l "id=[\"']contact[\"']" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/id=["'\'']\(contact\)["'\'']/id="about"/g' {}
grep -l "href=[\"']#contact[\"']" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/href=["'\'']#\(contact\)["'\'']/href="#about"/g' {}
grep -l "name:.*[\"']Contact[\"']" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/\(name:[[:space:]]*["'\'']\)Contact\(["'\'']\)/\1About\2/g' {}
grep -l "label:.*[\"']Contact[\"']" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/\(label:[[:space:]]*["'\'']\)Contact\(["'\'']\)/\1About\2/g' {}
grep -l "title:.*[\"']Contact[\"']" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/\(title:[[:space:]]*["'\'']\)Contact\(["'\'']\)/\1About\2/g' {}

# Handle text content (like button text or headings)
log "Updating text content..."
grep -l ">Contact<" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | xargs -I{} sed -i 's/>\(Contact\)</>\1</g; s/>\(Contact\)</>\1</g; s/>\(Contact\)</>\1</g;' {}

# Step 8: Cleanup and verification
log "Performing cleanup and verification..."

# Check if any ContactSection references remain
REMAINING_REFS=$(grep -l "ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR" | wc -l)
if [ "$REMAINING_REFS" -gt 0 ]; then
  warning "Found $REMAINING_REFS files with remaining ContactSection references:"
  grep -l "ContactSection" --include="*.jsx" --include="*.js" --include="*.ts" --include="*.tsx" -r "$SRC_DIR"
  
  # Handle any specific problematic cases that the automated replacements missed
  log "Applying additional targeted fixes..."
  
  # Example: Fix for specific problematic files
  if [ -f "$SRC_DIR/App.jsx" ]; then
    sed -i 's/ContactSection/AboutSection/g' "$SRC_DIR/App.jsx"
  fi
  
  # Additional specific fixes can be added as needed
else
  success "No remaining ContactSection references found"
fi

# Fix any remaining "Contact" text in section headers that might still be visible
log "Fixing any remaining 'Contact' text in section headers..."
find "$SRC_DIR" -type f -name "*.jsx" -exec sed -i 's/>Contact</>About</g' {} \;

# Step 9: Run linting to fix any formatting issues
if [ -f "$PROJECT_ROOT/package.json" ] && grep -q '"lint"' "$PROJECT_ROOT/package.json"; then
  log "Running linting to fix formatting..."
  npm run lint --fix || warning "Linting encountered issues, manual review may be needed"
else
  warning "No lint script found in package.json, skipping formatting fix"
fi

# Step 10: Summary and wrap-up
success "=== Conversion Summary ==="
success "✓ Created new AboutSection.jsx with meta learning content"
success "✓ Added gradient animation CSS to styles.css"
success "✓ Updated imports, exports, and component references"
success "✓ Updated section IDs, hrefs, and navigation labels"
success "✓ Attempted to fix any remaining issues"

# Provide instructions for testing and committing
echo ""
log "Next steps:"
echo "1. Run 'npm run dev' to test the changes"
echo "2. Verify that the About section appears correctly"
echo "3. Check that navigation links to the About section work"
echo "4. If everything looks good, commit the changes:"
echo "   git add ."
echo "   git commit -m \"Converted ContactSection to AboutSection with meta learning content\""
echo "   git push origin main"
echo ""
echo "If you encounter any issues, you can restore from the backup with:"
echo "  git reset --hard HEAD~1"
echo ""

# Final success message
success "Conversion process completed!"
