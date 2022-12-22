<template>
  <div>
    <Contact v-if="modals['contact']" />
    <Contact-Course v-if="modals['contact-course']" />
    <Contact-Person v-if="modals['contact-person']" />
    <Safeguarding v-if="modals['safeguarding']" />
    <Login v-if="modals['login']" />
  </div>
</template>

<script>
import Contact from './modals/Contact.vue'
import ContactCourse from './modals/ContactCourse.vue'
import ContactPerson from './modals/ContactPerson.vue'
import Safeguarding from './modals/Safeguarding.vue'
import Login from './modals/Login.vue'

export default {
  components: {
    Contact,
    ContactCourse,
    ContactPerson,
    Safeguarding,
    Login
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    }
  }
}
</script>

<style lang="scss">
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-content {
  letter-spacing: 0;
  color: #212529;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width: 90%;
  max-width: 850px;

  p.modal-form {
    margin: o auto;
    margin-bottom: 12px;
  }

  .modal-form {
    width: 80%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 850px) {
  .modal-content {
    width: 100%;
  }
}
</style>
