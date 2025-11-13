# 🎯 Email Actions - Quick Reference

## Hover Actions pada Email Item

Ketika user hover pada email item di list, muncul 4 tombol action:

### 1. **Archive** 📁
```typescript
@click="emailStore.archiveEmail(email.id)"
```
- **Function**: `archiveEmail(id: string)` di `useEmailStore.ts`
- **Action**: Memindahkan email ke folder `archive`
- **Side Effect**: Auto-select email berikutnya jika email yang di-archive sedang terpilih

### 2. **Delete** 🗑️
```typescript
@click="emailStore.deleteEmail(email.id)"
```
- **Function**: `deleteEmail(id: string)` di `useEmailStore.ts`
- **Action**: Memindahkan email ke folder `trash`
- **Side Effect**: Auto-select email berikutnya jika email yang di-delete sedang terpilih

### 3. **Toggle Read/Unread** ✉️
```typescript
@click="emailStore.toggleRead(email.id)"
```
- **Function**: `toggleRead(id: string)` di `useEmailStore.ts`
- **Action**: Toggle `email.unread` status
- **Icon**: Berubah antara `Mail` (unread) dan `MailOpen` (read)

### 4. **Snooze** ⏰
```typescript
@click="emailStore.snoozeEmail(email.id)"
```
- **Function**: `snoozeEmail(id: string)` di `useEmailStore.ts`
- **Action**: Mark email as unread (placeholder for future snooze feature)
- **TODO**: Implement proper snooze with date/time picker

---

## Event Flow

```
User clicks action button
         ↓
InboxMailItem emits event (@archive, @delete, etc.)
         ↓
InboxMailList passes event up
         ↓
inbox.vue connects to emailStore method
         ↓
useEmailStore updates state
         ↓
Computed properties auto-update (filteredEmails, displayEmails)
         ↓
UI reflects changes instantly
```

---

## Component Event Chain

### InboxMailItem.vue
```vue
<Button @click="$emit('archive', email.id)">
  <Archive :size="16" />
</Button>
```

### InboxMailList.vue
```vue
<InboxMailItem
  @archive="$emit('archive', $event)"
  @delete="$emit('delete', $event)"
  @toggle-read="$emit('toggle-read', $event)"
  @snooze="$emit('snooze', $event)"
/>
```

### inbox.vue
```vue
<InboxMailList
  @archive="emailStore.archiveEmail"
  @delete="emailStore.deleteEmail"
  @toggle-read="emailStore.toggleRead"
  @snooze="emailStore.snoozeEmail"
/>
```

---

## Bulk Actions

Selain hover actions, tersedia juga bulk actions untuk selected emails:

### Archive Selected
```typescript
emailStore.archiveSelected()
// Archives all emails in selectedIds array
```

### Delete Selected
```typescript
emailStore.deleteSelected()
// Deletes all emails in selectedIds array
```

### Mark Read Selected
```typescript
emailStore.markReadSelected()
// Marks all selected emails as read
```

---

## Tips for Adding New Actions

1. **Add method in useEmailStore.ts**:
```typescript
function myNewAction(id: string) {
  const email = emails.value.find(e => e.id === id)
  if (email) {
    // Your logic here
  }
}
```

2. **Export in return**:
```typescript
return {
  // ... existing
  myNewAction,
}
```

3. **Add event handler in InboxMailItem.vue**:
```vue
<Button @click="$emit('my-new-action', email.id)">
  <Icon :size="16" />
</Button>
```

4. **Pass event up in InboxMailList.vue**:
```vue
<InboxMailItem
  @my-new-action="$emit('my-new-action', $event)"
/>
```

5. **Connect in inbox.vue**:
```vue
<InboxMailList
  @my-new-action="emailStore.myNewAction"
/>
```

---

## State Management Benefits

✅ **Centralized Logic**: All email operations in one place  
✅ **Reactive Updates**: Changes automatically reflect in UI  
✅ **Type Safety**: Full TypeScript support  
✅ **Easy Testing**: Pure functions, easy to unit test  
✅ **Maintainable**: Clear separation of concerns  

---

*Last updated: November 13, 2025*
