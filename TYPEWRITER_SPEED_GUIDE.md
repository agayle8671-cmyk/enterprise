# Typewriter Speed Optimization Guide

## Speed Philosophy
Based on **Raycast DNA** and **Cognitive Luxury** principles, typewriter speeds are calibrated to feel:
- **Responsive**: Fast enough to feel alive
- **Readable**: Slow enough to be comfortable
- **Contextual**: Speed matches the importance/urgency of information

---

## Speed Categories

### 🚀 **FAST (35-42ms)** - System Status & Settings
**Context**: Background information, system confirmations
**Why**: Low-priority, ambient information that users glance at
**Examples**:
- Settings page system recommendations (35ms typing / 18ms deleting)
- Time audit insights (38ms typing / 18ms deleting)
- Client portal intelligence (40ms typing / 20ms deleting)

### ⚡ **MEDIUM (42-50ms)** - Active Workflows
**Context**: Work-in-progress, actionable intelligence
**Why**: User is actively working, needs quick but clear updates
**Examples**:
- Home dashboard live status (40ms typing / 20ms deleting)
- Tool builder performance (42ms typing / 21ms deleting)
- Proposal intelligence (42ms typing / 20ms deleting)
- Auth page welcomes (45ms typing / 25ms deleting)

### 🎯 **STANDARD (50-60ms)** - Hero Content & Landing
**Context**: First impressions, marketing copy, key messaging
**Why**: User needs time to absorb value propositions
**Examples**:
- Landing page hero subheadline (60ms typing / 30ms deleting)
- Landing page agent reasoning demo (50ms typing / 25ms deleting)
- Agents page activity feed (45ms typing / 22ms deleting)

---

## Pause Times (After Complete Phrase)

### Short Pause (2500-2800ms)
- Quick status updates
- Frequent information
- Auth pages

### Medium Pause (3000-3200ms)
- Dashboard insights
- Performance metrics
- Tool analytics

### Long Pause (3400-3600ms)
- Hero content
- Settings/system info
- Less urgent information

---

## Deletion Speed

**Rule**: Always **~2x faster** than typing speed
- Creates natural "backspacing" feel
- Prevents users from getting bored during deletion
- Maintains Raycast's snappy, responsive feel

---

## Current Implementation

| Page | Context | Typing | Deleting | Pause | Rationale |
|------|---------|--------|----------|-------|-----------|
| **Landing Hero** | Subheadline | 60ms | 30ms | 3000ms | First impression - let it sink in |
| **Landing Agent Demo** | Live reasoning | 50ms | 25ms | 2500ms | Demonstrating capability |
| **Home Dashboard** | System status | 40ms | 20ms | 3000ms | Quick glance info |
| **Agents Page** | Activity feed | 45ms | 22ms | 2800ms | Real-time feel |
| **Proposals** | Intelligence | 42ms | 20ms | 3200ms | Actionable insights |
| **Time Audit** | Time intelligence | 38ms | 18ms | 3400ms | Background analytics |
| **Client Portal** | Client intel | 40ms | 20ms | 2800ms | Relationship management |
| **Tool Builder** | Performance | 42ms | 21ms | 3000ms | Tool metrics |
| **Offer Architect** | Offer intel | 38ms | 19ms | 3200ms | Pricing insights |
| **Settings** | Recommendations | 35ms | 18ms | 3400ms | System status |
| **Auth Page** | Welcome messages | 45ms | 25ms | 2500ms | Friendly greeting |

---

## Testing Notes

✅ **Optimal Feel**: All speeds tested for readability and "alive" sensation
✅ **Character Count**: Works well with 40-70 character phrases
✅ **Cognitive Load**: Slower speeds for complex/important info
✅ **Blink Cursor**: Standard 1000ms blink (defined in TypewriterText component)

---

## Future Optimizations

1. **User Preference**: Allow users to adjust global speed multiplier in Settings
2. **Adaptive Speed**: Slow down for longer phrases, speed up for short ones
3. **Context Detection**: Pause longer if user is hovering over the text
4. **Accessibility**: Add option to disable animation entirely (instant text)

---

*Last Updated: 2026-01-07*
*Cognitive Luxury Standard v1.0*
