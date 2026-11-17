<template>
  <section class="mx-auto max-w-[760px]">
    <form
      class="rounded-2xl border border-slate-200 bg-white px-4 pt-1 pb-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
      @submit.prevent="sendMoney"
    >
      <!-- Header -->
      <header class="flex items-center gap-3">
        <span
          class="flex size-[46px] items-center justify-center rounded-xl bg-blue-50 text-blue-600"
        >
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
            />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </span>
        <h1 class="text-[26px] font-bold tracking-tight text-slate-900">Send Money</h1>
      </header>

      <!-- Amount / Reference / Date / Sender -->
      <div class="mt-2.5 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
        <div>
          <label for="amount" class="field-label">Amount <span class="text-red-500">*</span></label>
          <div
            class="flex h-[30px] overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
          >
            <input
              id="amount"
              v-model="form.amount"
              name="amount"
              type="float"
              min="0"
              placeholder="0.00"
              class="min-w-0 flex-1 bg-transparent px-3.5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
            />
            <div class="relative w-[88px] shrink-0 border-l border-slate-300">
              <select
                id="currency"
                v-model="form.currency"
                name="currency"
                aria-label="Currency"
                class="h-full w-full appearance-none bg-transparent pr-8 pl-4 text-[14px] text-slate-900 outline-none"
              >
                <option value="SAR">SAR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AED">AED</option>
              </select>
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label for="reference" class="field-label"
            >Reference <span class="text-red-500">*</span></label
          >
          <input
            id="reference"
            :value="form.reference"
            name="reference"
            type="text"
            readonly
            class="field-input px-3 tracking-tight"
          />
        </div>

        <div>
          <label for="date" class="field-label">Date <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              id="date"
              :value="form.date"
              name="date"
              type="text"
              readonly
              class="field-input pr-10"
            />
            <svg
              class="pointer-events-none absolute top-1/2 right-3 size-[18px] -translate-y-1/2 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
        </div>

        <div>
          <label for="sender" class="field-label"
            >Sender Account <span class="text-red-500">*</span></label
          >
          <input
            id="sender"
            v-model="form.sender.accountNumber"
            name="sender"
            type="text"
            placeholder="SA6980000204608016212908"
            class="field-input"
            disabled
          />
        </div>
      </div>

      <!-- Receiver -->
      <div
        role="group"
        aria-labelledby="receiver-heading"
        class="mt-5 rounded-xl bg-[#eef3fa] px-4 pt-0.5 pb-2.5"
      >
        <h2 id="receiver-heading" class="mb-1 text-[17px] leading-[22px] font-bold text-slate-900">
          Receiver
        </h2>
        <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          <div>
            <label for="bankCode" class="field-label"
              >Bank Code <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.receiver.bankCode"
              id="bankCode"
              name="bankCode"
              type="text"
              placeholder="FDCSSARI"
              class="field-input"
            />
          </div>
          <div>
            <label for="receiver" class="field-label"
              >Account Number <span class="text-red-500">*</span></label
            >
            <input
              id="receiver"
              v-model="form.receiver.accountNumber"
              name="receiver"
              type="text"
              placeholder="SA6980000204608016211111"
              class="field-input"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="beneficiaryName" class="field-label"
              >Beneficiary Name <span class="text-red-500">*</span></label
            >
            <input
              id="beneficiaryName"
              v-model="form.receiver.beneficiaryName"
              name="beneficiaryName"
              type="text"
              placeholder="Jane Doe"
              class="field-input"
            />
          </div>
        </div>
      </div>

      <div class="px-3">
        <!-- Payment type / Charge details -->
        <div class="mt-2 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <div>
            <label for="paymentType" class="field-label">Payment Type</label>
            <div class="relative">
              <select
                v-model.number="form.paymentType"
                id="paymentType"
                name="paymentType"
                class="field-input appearance-none pr-10"
              >
                <option value="99">99</option>
                <option value="421">421</option>
              </select>
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
          <div>
            <label for="chargeDetails" class="field-label">Charge Details</label>
            <div class="relative">
              <select
                v-model="form.chargeDetails"
                id="chargeDetails"
                name="chargeDetails"
                class="field-input appearance-none pr-10"
              >
                <option value="SHA">SHA</option>
                <option value="OUR">OUR</option>
                <option value="BEN">BEN</option>
                <option value="RB">RB</option>
              </select>
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="mt-3">
          <h2 class="text-[17px] leading-[21px] font-bold text-slate-900">Notes</h2>
          <ul class="mt-1.5 space-y-2 pl-1">
            <li v-for="(note, index) in form.notes" :key="index" class="flex items-center gap-4">
              <input
                v-model="form.notes[index]"
                :name="`note-${index}`"
                type="text"
                :placeholder="'Lorem Epsum'"
                :aria-label="`Note ${index + 1}`"
                class="field-input flex-1"
              />
              <button
                @click="removeNote(index)"
                type="button"
                class="flex size-[30px] shrink-0 items-center justify-center rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600"
                :aria-label="`Remove note ${index + 1}`"
              >
                <svg
                  class="size-[22px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
                </svg>
              </button>
            </li>
          </ul>
          <button
            @click="addNote"
            type="button"
            class="mt-2.5 ml-1 inline-flex h-[29px] items-center gap-2 rounded-md border border-blue-400 bg-blue-50 px-4 text-[14px] font-semibold text-blue-600 hover:bg-blue-100"
          >
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5v14" />
            </svg>
            Add Note
          </button>
        </div>
      </div>

      <!-- Request preview -->
      <div class="-mx-1 mt-3 rounded-xl border border-slate-200 bg-slate-50 px-2.5 pt-2 pb-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span
              class="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-blue-600"
            >
              <svg
                class="size-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
                />
              </svg>
            </span>
            <h2 class="text-[17px] font-bold text-slate-900">Request Preview</h2>
          </div>
        </div>
        <pre>{{ JSON.stringify(payload, null, 2) }}</pre>
      </div>

      <button
        type="submit"
        class="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-[15px] font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:outline-none"
      >
        Send Money
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const senderAccountNumber = 'SA6980000204608016212908'

const form = reactive({
  amount: 0,
  reference: crypto.randomUUID(),
  date: formatTransferDate(),
  currency: 'SAR',
  sender: { senderAccountNumber },
  receiver: {
    bankCode: '',
    accountNumber: 'SA6980000204608016211111',
    beneficiaryName: '',
  },
  notes: [] as string[],
  paymentType: 99,
  chargeDetails: 'SHA',
})

function addNote() {
  const lastNote = form.notes[form.notes.length - 1]

  if (lastNote !== undefined && lastNote?.trim() === '') {
    alert('Please fill the note before adding a new one.')
    return
  }
  form.notes.push('')
}

function removeNote(index: number) {
  if (index >= 0 && index < form.notes.length) {
    form.notes.splice(index, 1)
  }
}

const notesForPayload = computed(() => {
  const filled = form.notes.filter((note) => note.trim() !== '')
  return filled.length > 0 ? filled : undefined
})

function formatTransferDate(): string {
  const now = new Date()
  const dateTime = now.toLocaleString('sv-SE') // "2026-11-16 20:04:42"
  const offset = -now.getTimezoneOffset() / 60 // 2
  const sign = offset >= 0 ? '+' : '-'
  return dateTime + sign + String(Math.abs(offset)).padStart(2, '0')
}

setInterval(() => {
  form.date = formatTransferDate()
}, 1000)

const payload = computed(() => {
  return {
    reference: form.reference,
    date: form.date,
    amount: form.amount,
    currency: form.currency,
    sender: { accountNumber: form.sender.senderAccountNumber },
    receiver: {
      bankCode: form.receiver.bankCode,
      accountNumber: form.receiver.accountNumber,
      beneficiaryName: form.receiver.beneficiaryName,
    },
    ...(notesForPayload.value ? { notes: notesForPayload.value } : {}),
    ...(form.paymentType !== 99 ? { paymentType: form.paymentType } : {}),
    ...(form.chargeDetails !== 'SHA' ? { chargeDetails: form.chargeDetails } : {}),
  }
})

async function sendMoney() {
  try {
    formatTransferDate()
    const response = await fetch('http://localhost:4000/api/transfers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.value),
    })
    const data = await response.json()

    if (response.ok) {
      alert('Transaction sent successfully!')
      form.reference = crypto.randomUUID()
    } else {
      const issues: { path: string; message: string }[] = data.error?.issues ?? []
      const details = issues.map((issue) => issue.message).join('\n')
      alert(details || data.error?.message || 'Unknown error')
    }
  } catch (error) {
    console.error('Network error:', error)
    alert('Network error: ' + (error instanceof Error ? error.message : String(error)))
  }
}
</script>

<style scoped>
@reference '../assets/main.css';

.field-label {
  @apply mb-1 block text-[15px] leading-[19px] font-medium text-slate-800;
}

.field-input {
  @apply block h-[30px] w-full rounded-md border border-slate-300 bg-white px-3.5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 read-only:text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20;
}

.chevron {
  @apply pointer-events-none absolute top-1/2 right-3 size-[18px] -translate-y-1/2 fill-none stroke-slate-600 stroke-2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* JSON syntax colours in the preview */
.k {
  @apply text-sky-300;
}
.s {
  @apply text-emerald-300;
}
.n {
  @apply text-amber-400;
}
</style>
