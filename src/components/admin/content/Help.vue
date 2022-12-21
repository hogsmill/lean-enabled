<template>
  <div class="help">
    <table v-if="showHelp" class="help-table">
      <thead>
        <tr>
          <th>
            Use
          </th>
          <th>
            For
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>[</b><i>link</i><b>|</b><i>text (optional)</i><b>]</b>
          </td>
          <td>
            link to a page on the site
          </td>
        </tr>
        <tr>
          <td>
            <b>{</b><i>url</i><b>|</b><i>text (optional)</i><b>}</b>
          </td>
          <td>
            an external link
          </td>
        </tr>
        <tr>
          <td>
            <b>~</b><i>filename</i><b>|</b><i>text (optional)</i><b>~</b>
          </td>
          <td>
            link to a file
          </td>
        </tr>
        <tr>
          <td>
            <b>%</b><i>text</i><b>%</b>
          </td>
          <td>
            Contact Us
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    showHelp() {
      return this.$store.getters.getShowHelp
    }
  }
}
</script>

<style lang="scss">
.help {
  .help-table {
    max-width: 50%;
    margin-bottom: 12px !important;
  }
}
</style>
